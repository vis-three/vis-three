import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";
import {
  SELECTED,
  SelectedEvent,
  SelectionEngine,
  SELECTION_PLUGIN,
} from "@vis-three/selection-plugin";
import {
  EventManagerEngine,
  EVENT_MANAGER_PLUGIN,
  GlobalEvent,
} from "@vis-three/event-manager-plugin";
import {
  TransformControlsEngine,
  TRANSFORM_CONTROLS_PLUGIN,
} from "@vis-three/transform-controls-plugin";

export interface TransSelectEventEngine
  extends SelectionEngine,
    EventManagerEngine,
    TransformControlsEngine {}

export const name = transPkgName(pkgname);

export const TransSelectEventStrategy: Strategy<TransSelectEventEngine> =
  function () {
    let clickFun: (event: GlobalEvent) => void;
    let selectedFun: (event: SelectedEvent) => void;
    return {
      name,
      condition: [
        SELECTION_PLUGIN,
        EVENT_MANAGER_PLUGIN,
        TRANSFORM_CONTROLS_PLUGIN,
      ],
      exec(engine) {
        // 与eventManager作用
        engine.eventManager.addFilterObject(engine.transformControls);

        clickFun = (event) => {
          // 兼容transformControls事件
          if (engine.transing) {
            engine.transing = false;
            return;
          }
          const intersections = event.intersections;
          // ctrl多选
          if (!event.ctrlKey) {
            engine.selectionBox.clear();
          }

          if (engine.eventManager.penetrate) {
            for (const intersection of intersections) {
              // 反选
              if (event.ctrlKey) {
                if (engine.selectionBox.has(intersection.object)) {
                  engine.selectionBox.delete(intersection.object);
                  continue;
                }
              }
              engine.selectionBox.add(intersection.object);
            }
          } else {
            if (intersections.length) {
              const object = intersections[0].object;
              // 反选
              if (event.ctrlKey) {
                if (engine.selectionBox.has(object)) {
                  engine.selectionBox.delete(object);
                  return;
                }
              }
              engine.selectionBox.add(object);
            }
          }
          engine.dispatchEvent({
            type: SELECTED,
            objects: Array.from(engine.selectionBox),
          });
        };

        engine.eventManager.addEventListener<GlobalEvent>("click", clickFun);

        // 与selection联调
        selectedFun = (event) => {
          engine.transformControls.setAttach(...event.objects);
        };
        engine.addEventListener<SelectedEvent>(SELECTED, selectedFun);
      },
      rollback(engine) {
        engine.eventManager.removeFilterObject(engine.transformControls);
        engine.eventManager.removeEventListener<GlobalEvent>("click", clickFun);
        engine.eventManager.removeEventListener<SelectedEvent>(
          SELECTED,
          selectedFun
        );
      },
    };
  };
