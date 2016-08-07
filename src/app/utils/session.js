import io from "socket.io-client";
import Rx from "rxjs";
import _ from "lodash";
import Immutable from "immutable";

const STORAGE_KEY = "vsui_session_token";
const STATE = {
    INVALID: 0,
    DISCONNECTED: 1,
    CONNECTED: 2
};

class Session {
    constructor() {
        console.log("Creating new session");
        this.STATE = STATE;

        this._onConnect = this._onConnect.bind(this);
        this._onDisconnect = this._onDisconnect.bind(this);
    }
    start(options) {
        this.state = STATE.DISCONNECTED;
        this.stateCallback = options.onStateChange;

        this.socket = io.connect("http://" + options.host + ":" + options.port);
        this.socket.on("connect", this._onConnect);
        this.socket.on("disconnect", this._onDisconnect);

        this._setupStreams();
    }
    request(topic, data, callback) {
        const requestId = _.uniqueId();
        this.requestStream.filter(r => r.requestId === requestId)
            .map(r => Immutable.fromJS(JSON.parse(r.payload)))
            .take(1)
            .subscribe(callback);

        this._send("request", topic, requestId, data);
    }
    stream(topic, data) {
        const requestId = _.uniqueId();
        const stream = this.streamStream
            .filter(r => r.requestId === requestId)
            .map(r => Immutable.fromJS(JSON.parse(r.payload)));

        this._send("stream", topic, requestId, data);
        return {
            stream,
            requestId
        };
    }
    cancel(requestId, callback) {
        this.request("unsubscribe", {
            requestId
        }, callback);
    }
    onLogin(token, user) {
        this.token = token;
        this.user = user;
        localStorage.setItem(STORAGE_KEY, token);
        this.state = STATE.CONNECTED;
        this.stateCallback(this.state);
    }
    onUnauthorized() {
        this.state = STATE.INVALID;
        this.stateCallback(this.state);
    }
    _onConnect() {
        const token = localStorage.getItem(STORAGE_KEY);
        if (token) {
            this._validateToken(token);
        } else {
            this.state = STATE.INVALID;
            this.stateCallback(this.state);
        }
    }
    _onDisconnect() {
        this.state = STATE.DISCONNECTED;
        this.stateCallback(this.state);
    }
    _setupStreams() {
        this.requestStream = Rx.Observable.fromEvent(this.socket, "request");
        this.requestStream.subscribe(r => {
            logger.info("IN: %s | %s | %O", r.topic, r.requestId, JSON.parse(r.payload));
        });
        this.streamStream = Rx.Observable.fromEvent(this.socket, "stream");
        this.streamStream.subscribe(r => {
            logger.info("IN: %s | %s | %O", r.topic, r.requestId, JSON.parse(r.payload));
        });
    }
    _send(channel, topic, requestId, data) {
        const env = {
            topic,
            requestId,
            payload: JSON.stringify(data)
        };
        if (this.token) {
            env.token = this.token;
        }
        logger.info("OUT: %s | %s | %O", topic, requestId, data);
        this.socket.emit(channel, env);
    }
    _validateToken(token) {
        this.request("validate", {
            token
        }, r => {
            if (r.get("isValid")) {
                this.token = token;
                this.user = r.get("user");
            }
            this.state = r.get("isValid") ? STATE.CONNECTED : STATE.INVALID;
            this.stateCallback(this.state);
        });
    }
}

export default new Session();
