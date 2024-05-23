import Pusher from "pusher-js";

var pusher = null;
var channel = null;

export default {
  createPusher() {
    pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
      appId: process.env.VUE_APP_PUSHER_APP_ID,
      key: process.env.VUE_APP_PUSHER_KEY,
      secret: process.env.VUE_APP_PUSHER_SECRET,
      cluster: "eu",
      useTLS: true,
    });
    channel = pusher.subscribe(
      `private-user.153b3b76-bfed-4a3c-a8fb-34513834987c`
    );
    channel.bind("NewMessage", (e) => {
      const event = new CustomEvent("new-message", { detail: e });
      window.dispatchEvent(event);
    });
  },
  unbindChannel() {
    if (channel) channel.unbind("NewMessage");
  },
};
