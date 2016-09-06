import Rx from "rxjs";
import Immutable from "immutable";
import Session from "utils/session";

export default class StarService {
    constructor(data, onUpdate, onComplete) {
        const d = Session.stream("stars/stream", data);
        this.stream = d.stream;
        this.requestId = d.requestId;

        this.subject = new Rx.BehaviorSubject(Immutable.List());
        this.subject.subscribe(onUpdate);

        this.stream
            .scan((state, update) =>
                update.get("operation") === "add" ?
                    state.concat(update.get("stars")) :
                    state.filterNot(s => update.get("stars").includes(s))
            , Immutable.List())
            .subscribe(this.subject);
        this.stream.take(1).subscribe(onComplete);
        logger.info("Star service started");
    }
    destroy() {
        Session.cancel(this.requestId);
        this.subject.unsubscribe();
        logger.info("Star service stopped");
    }
}
