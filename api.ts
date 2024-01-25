export const api = {
  product: {
    create: async (data: {
      name: string;
      price: string;
      weight: string;
      package: string;
      unit: string;
    }) => {
      const product = await fetch("/api/product", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      return product;
    },
    list: async () => {
      const products = await fetch(process.env.URL + "/api/product").then(
        (res) => res.json(),
      );
      return products;
    },
    getById: async (id: string) => {
      const product = await fetch("/api/product/" + id).then((res) =>
        res.json(),
      );
      return product;
    },
    update: async (
      id: string,
      data: {
        name: string;
        price: string;
        weight: string;
        package: string;
        unit: string;
      },
    ) => {
      try {
        const response = await fetch("/api/product/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(
            `Error al actualizar el producto: ${response.statusText}`,
          );
        }

        const updatedProduct = await response.json();
        return updatedProduct;
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw error;
      }
    },
    delete: async (id: string) => {
      const response = await fetch("/api/product/" + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar producto: ${response.statusText}`);
      }
      const deletedProduct = await response.json();
      return deletedProduct;
    },
  },
};
