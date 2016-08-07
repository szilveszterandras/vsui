import Rx from "rxjs";
import Immutable from "immutable";
import Session from "utils/session";

export default class TagService {
    constructor(data, onUpdate, onComplete) {
        console.log(" > Tag stream starting");
        const d = Session.stream("tags/stream", data);
        this.stream = d.stream;
        this.requestId = d.requestId;

        this.subject = new Rx.BehaviorSubject(Immutable.Map());
        this.subject.subscribe(onUpdate, undefined, () => {
            logger.info(" > Tag stream complete");
        });

        this.subscription = this.stream.scan((state, update) => {
            const m = update.reduce((map, x) =>
                map.set(x.get("tag"), x.get("count")), Immutable.Map());
            return state.merge(m);
        }, Immutable.Map()).subscribe(this.subject);
        this.stream.take(1).subscribe(onComplete);
    }
    destroy() {
        Session.cancel(this.requestId, () => {
            this.subscription.unsubscribe();
            this.subject.dispose();
        });
    }
}
