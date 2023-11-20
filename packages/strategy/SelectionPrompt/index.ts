import {
  ENGINE_EVENT,
  Engine,
  SetCameraEvent,
  SetSizeEvent,
  Strategy,
} from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";

import { name as pkgname } from "./package.json";
import {
  SELECTED,
  SELECTION_PLUGIN,
  SelectedEvent,
  SelectionEngine,
} from "@vis-three/plugin-selection";
import {
  EFFECT_COMPOSER_PLUGIN,
  EffectComposerEngine,
} from "@vis-three/plugin-effect-composer";
import { SelectionOutlinePass } from "./SelectionOutlinePass";
import { Color, Object3D, PerspectiveCamera, Texture, Vector2 } from "three";

interface SelectionPromptEngine extends SelectionEngine, EffectComposerEngine {}

export interface SelectionPromptParameters {
  selected: Object3D[];
  visibleEdgeColor: Color;
  edgeGlow: number;
  edgeThickness: number;
  edgeStrength: number;
  downSampleRatio: number;
  pulsePeriod: number;
  patternTexture: Texture;
  msaa: number;
}

export const SELECTION_PROMPT_STRATEGY = transPkgName(pkgname);

export const SelectionPromptStrategy: Strategy<
  SelectionPromptEngine,
  Partial<SelectionPromptParameters>
> = function (params: Partial<SelectionPromptParameters> = {}) {
  let setCameraFun: (event: SetCameraEvent) => void;
  let selectionFun: (event: SelectedEvent) => void;
  let pass: SelectionOutlinePass;

  return {
    name: SELECTION_PROMPT_STRATEGY,
    condition: [SELECTION_PLUGIN, EFFECT_COMPOSER_PLUGIN],
    exec(engine) {
      pass = new SelectionOutlinePass(
        new Vector2(engine.dom.offsetWidth, engine.dom.offsetHeight),
        engine.camera as PerspectiveCamera,
        []
      );

      for (const key in params) {
        if (pass[key] !== undefined) {
          pass[key] = params[key];
        }
      }

      engine.effectComposer.addPass(pass);

      setCameraFun = (event) => {
        pass.renderCamera = event.camera as PerspectiveCamera;
      };

      engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);

      selectionFun = (event) => {
        pass.selected = event.objects;
      };

      engine.addEventListener(SELECTED, selectionFun);
    },
    rollback(engine) {
      engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
      engine.removeEventListener(SELECTED, selectionFun);
      engine.effectComposer.removePass(pass);
    },
  };
};
