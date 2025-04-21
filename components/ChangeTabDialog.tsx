import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

const ChangeTabDialog = ({isOpen, onClose, onSaveAndMove, onMove}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>이 페이지를 벗어나시겠습니까?</DialogTitle>
                    <DialogDescription>
                        이동하시면 작성한 내용은 초기화됩니다.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                onMove();
                                onClose();
                            }}>
                            이동
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                onSaveAndMove();
                                onClose();
                            }}>
                            저장 후 이동
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            취소
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeTabDialog;
