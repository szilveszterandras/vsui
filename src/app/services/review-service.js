import Rx from "rxjs";
import Immutable from "immutable";
import Session from "utils/session";

export default class ReviewService {
    constructor(data, onUpdate, onComplete) {
        const d = Session.stream("reviews/stream", data);
        this.stream = d.stream;
        this.requestId = d.requestId;

        this.subject = new Rx.BehaviorSubject(Immutable.Map());
        this.subject.subscribe(onUpdate);

        this.stream
            .scan((state, update) => {
                if (update.has("isDeleted")) {
                    let newState = state;
                    update.get("ids").forEach(id => {
                        newState = newState.delete(id);
                    });
                    return newState;
                }
                const m = update.reduce((map, x) =>
                    map.set(x.get("id"), x), Immutable.Map());
                return state.merge(m);
            }, Immutable.Map()).subscribe(this.subject);
        this.stream.take(1).subscribe(onComplete);
        logger.info("Review service started");
    }
    destroy() {
        Session.cancel(this.requestId);
        this.subject.unsubscribe();
        logger.info("Review service stopped");
    }
}
