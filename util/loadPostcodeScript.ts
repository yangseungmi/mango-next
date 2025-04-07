export const loadPostcodeScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (document.getElementById('daum-postcode-script')) {
            resolve(); // 이미 로드됨
            return;
        }

        const script = document.createElement('script');
        script.id = 'daum-postcode-script';
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.onload = () => resolve();
        script.onerror = () => reject('Daum postcode script load error');
        document.body.appendChild(script);
    });
};
