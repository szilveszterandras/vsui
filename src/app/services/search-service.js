import Rx from "rxjs";
import Immutable from "immutable";
import Session from "utils/session";

export default class SearchService {
    constructor(onUpdate) {
        this.subject = new Rx.BehaviorSubject(Immutable.List());
        this.subject.subscribe(onUpdate);
    }
    init(topic, data) {
        console.log(" > Search stream starting");
        const d = Session.stream("search/" + topic, data);
        this.stream = d.stream;
        this.requestId = d.requestId;

        this.subscription = this.stream.subscribe(this.subject);
    }
    search(topic, data) {
        this.reset(() => {
            this.init(topic, data);
        });
    }
    reset(callback = () => {}) {
        if (!this.requestId) {
            callback();
            return;
        }
        Session.cancel(this.requestId, () => {
            this.subscription.unsubscribe();
            callback();
        });
    }
    destroy() {
        this.reset(() => {
            if (this.subject) {
                this.subject.unsubscribe();
            }
        });
    }
}
