import {
  Button,
  Swipe,
  SwipeItem,
  Popup,
  Sticky,
  Field,
  CellGroup,
} from "vant";
let plugins = [Button, Swipe, SwipeItem, Sticky, Popup, Field, CellGroup];
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
