import { EventDispatcher, BaseEvent } from "three";

// three所使用的eventDispatcher不能够传只读的target,无法继承鼠标的mouseEvent类
export class VisEventDispatcher<E extends BaseEvent = Event> extends EventDispatcher<E> {
  
  _listeners?: any
  
  dispatchEvent ( event: E ): void {
    if ( this._listeners === undefined ) return;

		const listeners = this._listeners;
		const listenerArray = listeners[ event.type ];

		if ( listenerArray !== undefined ) {
			try {
				//@ts-ignore
				event.target = this;
			} catch (error) {
				
			}

			// Make a copy, in case listeners are removed while iterating.
			const array = listenerArray.slice( 0 );

			for ( let i = 0, l = array.length; i < l; i ++ ) {

				array[ i ].call( this, event );

			}

			try {
				//@ts-ignore
				event.target = null;
			} catch (error) {
				
			}

		}
  }
}