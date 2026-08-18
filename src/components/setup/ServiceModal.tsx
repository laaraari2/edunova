import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string) => void;
    selectedTheme: string;
}

export function ServiceModal({ isOpen, onClose, onAdd, selectedTheme }: ServiceModalProps) {
    const [name, setName] = useState("");

    const handleSave = () => {
        if (name.trim()) {
            onAdd(name.trim());
            setName("");
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="font-black">Ajouter un service</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Input
                        placeholder="Nom du service"
                        className="h-12 rounded-xl"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button onClick={handleSave} style={{ backgroundColor: selectedTheme }}>
                        Enregistrer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
