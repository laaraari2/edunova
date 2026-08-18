import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CantineModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTheme: string;
}

export function CantineModal({ isOpen, onClose, selectedTheme }: CantineModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="rounded-3xl max-w-lg">
                <DialogHeader>
                    <DialogTitle className="font-black">Configuration de la cantine</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-black">Type de restauration</label>
                        <Select defaultValue="dejeuner">
                            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dejeuner">Déjeuner</SelectItem>
                                <SelectItem value="gouter">Goûter</SelectItem>
                                <SelectItem value="dejeuner-gouter">Déjeuner + Goûter</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button onClick={onClose} style={{ backgroundColor: selectedTheme }}>
                        Enregistrer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
