import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TarifModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedService: string;
    selectedLevels: string[];
    selectedTheme: string;
}

export function TarifModal({ open, onOpenChange, selectedService, selectedLevels, selectedTheme }: TarifModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="font-black">{selectedService}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-4">
                    {selectedLevels.map((levelCode) => (
                        <div key={levelCode} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                            <span className="font-bold">{levelCode}</span>
                            <div className="flex items-center gap-2">
                                <Input type="number" placeholder="0" className="w-28" />
                                <span>MAD</span>
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                    <Button style={{ backgroundColor: selectedTheme }} onClick={() => onOpenChange(false)}>
                        Enregistrer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
