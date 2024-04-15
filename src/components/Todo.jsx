import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  initializeTodos,
  removeTodo,
  toggleTodo,
} from "../lib/todo/todoSlice";
import TodoItem from "./TodoItem";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

const FormSchema = z.object({
  todo: z
    .string()
    .min(2, {
      message: "Todo must be at least 2 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    }),
});

const Todo = () => {
  const { toast } = useToast();

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      dispatch(initializeTodos(JSON.parse(localStorage.getItem("todos"))));
    }
  }, [dispatch]);

  const deleteTodo = (todo) => {
    dispatch(removeTodo(todo.id));
    toast({
      title: "Todo Deleted",
      action: (
        <ToastAction
          altText="Undo"
          onClick={() => dispatch(addTodo(todo.text))}
        >
          Undo
        </ToastAction>
      ),
    });
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      todo: "",
    },
  });

  function onSubmit(data) {
    dispatch(addTodo(data.todo));
    toast({
      title: "Todo Added Successfully",
    });
    form.reset();
  }

  return (
    <div className="min-h-[50vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex flex-row items-center justify-center w-full mt-8 "
        >
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem className="space-y-0 max-w-96 w-10/12 mx-auto">
                <FormLabel className="sr-only">todo</FormLabel>
                <div className="flex items-center justify-center pb-2 ">
                  <FormControl>
                    <Input
                      placeholder="Add Todo"
                      {...field}
                      className="border-r-none py-6 rounded-r-none"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    className="border-l-none border rounded-l-none py-6"
                  >
                    <FaPlus/>
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <ul className="flex flex-col items-center justify-center w-full mt-8">
        {todos.map((todo) => (
          <li key={todo.id} className="w-full flex justify-center ">
            <TodoItem
              todo={todo}
              onChange={() => dispatch(toggleTodo(todo.id))}
              onDelete={() => deleteTodo(todo)}
            />
          </li>
        ))}

        {todos.length === 0 && (
          <li className="w-full flex justify-center">
            <p className="text-xl text-primary">No todos available</p>
          </li>
        )}

      </ul>
    </div>
  );
};

export default Todo;
