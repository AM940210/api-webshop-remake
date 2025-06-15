"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  articleNumber: string;
  title: string;
  description: string;
  price: number;
  image: string;
  articleColorSize?: string;
  stock: number;
};

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const res = await fetch(`/api/product/${productToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setProducts((prev) =>
        prev.filter((p) => p.articleNumber !== productToDelete)
      );
      setProductToDelete(null);
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Failed to remove product. Please try again.");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.articleNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="container px-4 py-8 mx-auto max-w-full">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold">Product Management</h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto">
                  <Link href="/admin/product/new">
                    <Button
                      variant="default"
                      data-cy="admin-add-product"
                      className="w-full sm:w-auto"
                    >
                      Add Product
                    </Button>
                  </Link>
                  <div className="relative w-full sm:w-64">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                    {searchTerm && (
                      <Button
                        variant="ghost"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                        onClick={() => setSearchTerm("")}
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-full inline-block align-middle px-4 sm:px-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.articleNumber} data-cy="product">
                          <TableCell>
                            <div className="w-12 h-12 relative">
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="rounded object-cover"
                                sizes="48px"
                              />
                            </div>
                          </TableCell>
                          <TableCell data-cy="product-id">
                            {product.articleNumber}
                          </TableCell>
                          <TableCell
                            className="font-medium"
                            data-cy="product-title"
                          >
                            {product.title}
                          </TableCell>
                          <TableCell data-cy="product-price">
                            ${product.price.toFixed(2)}
                          </TableCell>
                          <TableCell data-cy="product-stock">
                            {product.stock}
                          </TableCell>
                          <TableCell className="text-right whitespace-nowrap">
                            <div className="flex justify-end space-x-2">
                              <Link
                                href={`/admin/product/${product.articleNumber}`}
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  data-cy="admin-edit-product"
                                >
                                  Edit
                                </Button>
                              </Link>
                              <Button
                                variant="destructive"
                                size="sm"
                                data-cy="admin-remove-product"
                                onClick={() =>
                                  setProductToDelete(product.articleNumber)
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Site Settings</h2>
              <p className="text-gray-500">Settings panel coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {productToDelete && (
        <Dialog
          open={!!productToDelete}
          onOpenChange={(open) => {
            if (!open) setProductToDelete(null);
          }}
        >
          <DialogContent className="sm:max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this product? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                onClick={() => setProductToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                data-cy="confirm-delete-button"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
