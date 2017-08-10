/**
 * 图片处理工具类
 */
import images from 'images';
export class ImageUtil {
    static resize(){
        images("mhh.png").resize(27,27).save("mhhhc.png");
    }
    static cut(){
        images(images("cj.png"),50, 50,100, 100 ).save("testt.png");
    }
}
