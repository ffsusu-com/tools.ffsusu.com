function loadImage(url, callback) {
    var img = new Image(); //����һ��Image����ʵ��ͼƬ��Ԥ����
    img.src = url;
    if (img.complete) { // ���ͼƬ�Ѿ���������������棬ֱ�ӵ��ûص�����
        callback.call(img);
        return; // ֱ�ӷ��أ������ٴ���onload�¼�
    }
    img.onload = function () { //ͼƬ�������ʱ�첽����callback������
        callback.call(img); //���ص�������this�滻ΪImage����
    };
};