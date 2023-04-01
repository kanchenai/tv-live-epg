import Page from "@core/frame/page/Page";
import html from "@html/home.html"
import {Adapter} from "@core/frame/view/group/RecycleView";
import VideoPlayer from "@core/frame/player/VideoPlayer";
import {ScrollCenter} from "@core/frame/view/base/ScrollView";
import channel_usual from "@src/mock-data/channel_usual";
import PlayInfo from "@core/frame/player/PlayInfo";

export default class HomePage extends Page {
    constructor() {
        super();
        this.pageName = "HomePage";
    }

    onCreate(param) {
        this.html = html;
        this.initView();
        this.setView();
        this.initUtil();
    }

    initView() {
        this.setStyle("background", "none");
        this.channel_list = this.findViewById("channel_list");
        this.channel_list.scrollLocate = ScrollCenter;
        this.channel_list.adapter = new ChannelAdapter();
        this.channel_list.data = channel_usual;


        // this.findEleById("background").style.display = "none"

        this.player = new VideoPlayer(this);
    }

    setView() {
        this.player.onPositionChangeListener = "onPositionChangeListener";
        this.player.onVolumeChangeListener = "onVolumeChangeListener";
        this.player.onPlayStart = "onPlayStart";
        this.player.onPlayComplete = "onPlayComplete";
        this.player.onPlayPause = "onPlayPause";
        this.player.onPlayResume = "onPlayResume";
        this.player.onPlayStop = "onPlayStop";
        this.player.onPlayError = "";
        this.player.onPlayByTime = "onPlayByTime";

    }

    initUtil() {

    }

    onClickListener(view) {
        console.log(view.pageName, "-onClickListener", view);
    }

    onFocusChangeListener(view, hasFocus) {
        if (hasFocus) {
            this.player.stop();

            console.log(view.data.url);
            var playUrl = view.data.url;
            var playInfo = new PlayInfo(playUrl, 0, 0, 1280, 720)
            this.player.play(0, playInfo);

            this.hideChannel();
        }
    }

    hideChannel() {
        if (this.hideChannelTimer) {
            clearTimeout(this.hideChannelTimer)
        }

        var channel_scroll = this.findViewById("channel_scroll");

        this.hideChannelTimer = setTimeout(function () {
            channel_scroll.scrollHorizontalTo(150);
        }, 5000);
    }

    onVisibleChangeListener(view, isShowing) {
        console.log("显示监听", isShowing, view);
    }

    onScrollStartListener(scrollView, x, y) {
        // console.log("开始滚动", scrollView, x, y);
    }

    onScrollingListener(scrollView, x, y) {
        // console.log("滚动中", scrollView, x, y);
    }

    onScrollEndListener(scrollView, x, y) {
        // console.log("滚动结束", scrollView, x, y);
    }

    onResume() {
        // console.log(this.pageName + "-onResume");
    }

    onPause() {
        console.log(this.pageName + "-onPause");
    }

    onStop() {
        console.log(this.pageName + "-onStop");
    }

    onDestroy() {
        console.log(this.pageName + "-onDestroy");
    }

    onPlayStart() {
        this.findEleById("background").style.display = "none";
        console.log("onPlayStart");
    }

    onPositionChangeListener(position, duration) {
        console.log("onPositionChangeListener");
        // console.log("onPositionChangeListener position, duration", position, duration);
    }

    onVolumeChangeListener(volume) {
        console.log("onVolumeChangeListener", volume);
    }

    onPlayComplete() {
        console.log("onPlayComplete");
    }

    onPlayPause() {
        console.log("onPlayPause");
    }

    onPlayResume() {
        console.log("onPlayResume");
    }

    onPlayStop() {
        console.log("onPlayStop");
        this.findEleById("background").style.display = "block";
    }

}

class ChannelAdapter extends Adapter {
    bindHolder(holder, data) {
        var index = holder.index;

        // if(index % 2 != 0){
        //     holder.component.setStyle("background","gray")
        // }
        var channel_name = holder.findViewById("channel_name");
        channel_name.text = data.name;
        // holder.findEleById("channel_name").innerHTML = data.name;

    }
}
