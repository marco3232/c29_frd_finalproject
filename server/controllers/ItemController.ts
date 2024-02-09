import express, { Request, Response } from "express";
import { ItemService } from "../services/Item.service";

export class ItemController {
  router = express.Router();
  constructor(private itemService: ItemService) {
    this.router.get("/items", this.list);
    this.router.post("/item", this.create);
    // this.router.put("/item/title/:id", this.updateName);
    // this.router.put("/item/toggle/:id", this.updateStatus);
    // this.router.delete("/item/:id", this.delete);
  }

  list = async (req: Request, res: Response) => {
    // console.log("this is list", req.body);
    let list = await this.itemService.getAll();
    res.status(200).json({ data: list });
  };

    create = async (req: Request, res: Response) => {
      let { quantity_input } = req.body;

      let result = await this.itemService.createItem(
        quantity_input
      );

      if (result) res.status(200).json({ message: "success" });
      else
        res
          .status(500)
          .json({ message: "internal server error,cannot insert new item" });
    };

  //   delete = async (req: Request, res: Response) => {
  //     let { id } = req.params;

  //     console.log("check id", id);
  //     let result = await this.todoService.deleteItem(parseInt(id));

  //     if (result) res.status(200).json({ message: "success" });
  //     else
  //       res
  //         .status(500)
  //         .json({ message: "internal server error,cannot delete item" });
  //   };

  //   updateStatus = async (req: Request, res: Response) => {
  //     let { id } = req.params;
  //     console.log("check id", id);

  //     let result = await this.todoService.updateStatus(parseInt(id));

  //     if (result) res.status(200).json({ message: "success" });
  //     else
  //       res
  //         .status(500)
  //         .json({ message: "internal server error,cannot update item status" });
  //   };

  //   updateName = async (req: Request, res: Response) => {
  //     let id = req.params.id;
  //     let { new_input } = req.body;

  //     console.log("check id", id, new_input);

  //     let result = await this.todoService.updateName(parseInt(id), new_input);

  //     if (result) res.status(200).json({ message: "success" });
  //     else
  //       res
  //         .status(500)
  //         .json({ message: "internal server error,cannot update item name" });
  //   };
}