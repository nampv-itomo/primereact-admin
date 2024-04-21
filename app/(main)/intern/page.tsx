'use client';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '@/service/ProductService';
import { useTranslation } from 'react-i18next';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

const Intern = () => {
    const {t} = useTranslation()
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        ProductService.getProductsMini().then((data) => setProducts(data));
    }, []);

    return (
        <div className="grid">
            <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="card">
                    <DataTable value={products} tableStyle={{ minWidth: '30rem' }}>
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header={t('Quantity')}></Column>
                        <Column field="category" header="Category"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                    </DataTable>
                </div>
            </div>
            <div className="lg:col-6 md:col-12 sm:col-12">
                <div className="card">
                    <DataTable value={products} tableStyle={{ minWidth: '30rem' }}>
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="category" header="Category"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Intern;
