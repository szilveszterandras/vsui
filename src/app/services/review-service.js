import Rx from "rxjs";
import Immutable from "immutable";
import Session from "utils/session";

export default class ReviewService {
    constructor(data, onUpdate, onComplete) {
        console.log(" > Review stream starting");
        const d = Session.stream("reviews/stream", data);
        this.stream = d.stream;
        this.requestId = d.requestId;

        this.subject = new Rx.BehaviorSubject(Immutable.Map());
        this.subject.subscribe(onUpdate);

        this.subscription = this.stream
            .scan((state, update) => {
                if (update.has("isDeleted")) {
                    return state.delete(update.get("id"));
                }
                const m = update.reduce((map, x) =>
                    map.set(x.get("id"), x), Immutable.Map());
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
