import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";

interface LogoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LogoModal({ isOpen, onClose, onUpload }: LogoModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="font-black">Importer un logo</DialogTitle>
                </DialogHeader>
                <label
                    htmlFor="logo-upload"
                    className="flex flex-col items-center justify-center min-h-48 rounded-3xl border-2 border-dashed cursor-pointer hover:bg-sky-50"
                >
                    <CloudUpload className="w-10 h-10 text-slate-300" />
                    <p className="font-black mt-4">Cliquez pour choisir un fichier</p>
                    <p className="text-xs text-slate-400 mt-2">PNG, JPG ou SVG — 5 MB maximum</p>
                    <input
                        id="logo-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml"
                        className="hidden"
                        onChange={onUpload}
                    />
                </label>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Annuler</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
