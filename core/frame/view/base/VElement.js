export class VElement{
    /**
     *
     * @param{Element} ele
     */
    constructor(nativeEle) {
        this._nativeEle = nativeEle;
        this.tagName = "";
        this.className = "";
        this.children = [];
        this.parent = null;
        this.data = {};
    }


    get nativeEle(){
        return this._nativeEle;
    }

    set nativeEle(value){
        this._nativeEle = value;
    }
}

/**
 *
 * @param{VElement} ele
 * @param{Element}nativeEle
 */
var initVEle = function (ele,nativeEle){

}
