

import { z } from "zod";

export const LoginFormSchema = z.object({
    username: z.string().min(1, { message: "Vui lòng nhập username" }),
    password: z.string().min(1, { message: "Vui lòng nhập password" }),
});
