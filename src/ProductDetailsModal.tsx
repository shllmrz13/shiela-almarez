import React from "react";
import {
  Dialog,
  DialogBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Product } from "./models/models";

interface ProductDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  product: Product | null;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  open,
  handleClose,
  product,
}) => {
  return (
    <Dialog open={open} handler={handleClose}>
      {product && (
        <>
          <DialogBody divider className="">
            <div className="flex justify-end items-end">
              <Button variant="text" color="blue-gray" onClick={handleClose}>
                X
              </Button>
            </div>
            <div>
              <p className="text-xs font-thin">SMARTPHONES</p>
              <p className="text-xl font-bold">{product.title}</p>
            </div>
            <Typography variant="paragraph" color="blue-gray" className="mt-4">
              {product.description}
            </Typography>
            <Typography variant="paragraph" color="blue-gray" className="mt-4">
              <strong>Price: </strong> ₱{product.price}
            </Typography>

            <div className="bg-blue-gray-50 p-3 mt-4">
              <p>MORE IMAGES</p>
              <div className="flex flex-row mt-2 justify-evenly gap-4">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-16 h-16 object-cover"
                  />
                ))}
              </div>
            </div>
          </DialogBody>
        </>
      )}
    </Dialog>
  );
};

export default ProductDetailsModal;
