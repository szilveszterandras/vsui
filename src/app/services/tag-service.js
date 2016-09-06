import Rx from "rxjs";
import Immutable from "immutable";
import Session from "utils/session";

export default class TagService {
    constructor(data, onUpdate, onComplete) {
        const d = Session.stream("tags/stream", data);
        this.stream = d.stream;
        this.requestId = d.requestId;

        this.subject = new Rx.BehaviorSubject(Immutable.Map());
        this.subject.subscribe(onUpdate);

        this.stream
            .scan((state, update) => {
                const m = update.reduce((map, x) => {
                    if (!x) {
                        return map;
                    }
                    return map.set(x.get("tag"), x.get("count"));
                }, Immutable.Map());
                return state.merge(m);
            }, Immutable.Map())
            .subscribe(this.subject);
        this.stream.take(1).subscribe(onComplete);
        logger.info("Tag service started");
    }
    destroy() {
        Session.cancel(this.requestId);
        this.subject.unsubscribe();
        logger.info("Tag service stopped");
    }
}
