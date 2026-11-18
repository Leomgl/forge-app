// FORGE adapter only. The icon artwork is versioned in BLOCKS.
import {createIcon} from "./blocks/icons.mjs";
const ids={tickets:"home",completed:"check-circle",composer:"plus",context:"grid",settings:"sliders"};
for(const tab of document.querySelectorAll(".bottom-nav-item[data-view]")){
 const old=tab.querySelector("svg");if(!old)continue;
 const icon=createIcon(ids[tab.dataset.view]||"grid",22);
 old.replaceWith(icon);
}
