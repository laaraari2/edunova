import React from "react";

export type Establishment = {
    id: string;
    company_id: string;
    name: string;
    slug: string;
    city: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    logo_url: string | null;
    status: string;
    setup_completed: boolean;
    created_at: string;
    updated_at: string;
};

export type Service = {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    req: boolean;
    checked: boolean;
};
