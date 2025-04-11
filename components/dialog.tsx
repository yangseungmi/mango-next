import React from 'react';
import {Dialog, DialogClose, DialogContent} from "@/components/ui/dialog";

const DialogPopup = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <div>
                    <p>이 페이지를 벗어나시겠습니까?</p>
                    <div>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                        >
                            이동
                        </button>
                        <DialogClose asChild>
                            <button onClick={onClose}>취소</button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogPopup;
