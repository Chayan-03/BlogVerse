import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 p-4 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative transform animate-scale-in text-center">
                <div className="mx-auto bg-red-100 h-12 w-12 flex items-center justify-center rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl mt-4 font-semibold text-slate-800">{title}</h3>
                <p className="text-gray-500 mt-2">{message}</p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button variant="outline" onClick={onClose} className="w-full">
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} className="w-full">
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
