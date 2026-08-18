import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransportModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTheme: string;
}

export function TransportModal({ isOpen, onClose, selectedTheme }: TransportModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="rounded-3xl max-w-lg">
                <DialogHeader>
                    <DialogTitle className="font-black">Configuration du transport</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-black">Type de transport</label>
                        <Select defaultValue="aller-retour">
                            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="aller">Aller uniquement</SelectItem>
                                <SelectItem value="retour">Retour uniquement</SelectItem>
                                <SelectItem value="aller-retour">Aller + Retour</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="text-sm font-black">Nombre de trajets</label>
                        <Select defaultValue="2">
                            <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 trajet</SelectItem>
                                <SelectItem value="2">2 trajets</SelectItem>
                                <SelectItem value="3">3 trajets</SelectItem>
                                <SelectItem value="4">4 trajets</SelectItem>
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
