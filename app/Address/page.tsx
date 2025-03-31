import {Input} from "postcss";
import {useState} from "react";

export default function Address() {


    const [address, setAddress] = useState<string>(''); // 선택된 주소를 저장할 상태
    const [detailAddress, setDetailAddress] = useState<string>(''); // 선택된 주소를 저장할 상태

    const [moveAddress, setMoveAddress] = useState<string>('');
    const [moveDetailAddress, setMoveDetailAddress] = useState<string>('');

    const [isPostcodeVisible, setIsPostcodeVisible] = useState<boolean>(true); // 주소 검색창 표시 여부

    return (
        <>
            <Input type="text"/>

            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">Pro Form Layout</h2>
                    <StepperContainer step={2}/>
                </div>
                <div
                    className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div
                        className="border-b border-stroke px-6.5 p-4 dark:border-strokedark flex gap-1 xl:flex-row">
                        <h3 className="font-medium text-black dark:text-white">
                            1. 방문할 주소를 알려주세요.
                        </h3>
                        <div className="ml-auto">
                            <CheckboxTwo id="myAddress" value="내 주소 사용하기(로그인한 상태)"></CheckboxTwo>
                        </div>
                    </div>
                    <div className="flex border-b flex-col gap-2 p-6.5">
                        <div className="m-5 flex flex-col gap-1 xl:flex-row">
                            <div>
                                <div id="postcode"></div>
                                {isPostcodeVisible ? '' : (
                                    <>
                                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                            선택된 주소
                                        </label>
                                        <div className="flex">
                                            <div className="w-4/6 rounded-lg border-[1.5px]">
                                                <IonInput
                                                    className="p-2 text-sm outline-0 custom-input"
                                                    readonly={true}
                                                    value={address}
                                                    labelPlacement="floating"
                                                    fill="outline">
                                                </IonInput>
                                            </div>
                                            <IonButton
                                                size='small'
                                                className="w-1/6"
                                                onClick={() => {
                                                    setIsPostcodeVisible(true);
                                                    loadPostcode();
                                                }}>
                                                다시 검색
                                            </IonButton>
                                        </div>
                                        <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                                            상세 주소
                                        </label>
                                        <div className="flex">
                                            <div className="w-4/6 rounded-lg border-[1.5px]">
                                                <IonInput
                                                    className="p-1 text-sm outline-0 custom-input"
                                                    value={detailAddress}
                                                    clearInput={true}
                                                    labelPlacement="floating"
                                                    onIonChange={(e) => setDetailAddress(e.detail.value!)}
                                                    fill="outline">
                                                </IonInput>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className="border-b border-stroke px-6.5 p-4 dark:border-strokedark flex gap-1 xl:flex-row">
                        <h3 className="font-medium text-black dark:text-white">
                            2. 이전할 주소를 알려주세요.(상태가 이전인 경우)
                        </h3>
                        <div className="ml-auto">
                            <CheckboxTwo id="myAddress" value="내 주소 사용하기(로그인한 상태)"></CheckboxTwo>
                        </div>
                    </div>
                    <div className="flex border-b flex-col gap-2 p-6.5">
                        <div className="m-5 flex flex-col gap-1 xl:flex-row">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

