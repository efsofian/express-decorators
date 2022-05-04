import { Request, Response, NextFunction } from "express";
import { get, controller, use } from "./decorators";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    res.status(403).send("not permitted");
  }
}

@controller("") // to avoid the path: '//'
class RootController {
  @get("/")
  getRoute(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
            <div>
              <div>You are logged in</div>
              <a href="/logout">Logout</a>
              </div>`);
    } else {
      res.send(`
            <div>
              <div>You are not logged in</div>
              <a href="/login">Login</a>
            </div>`);
    }
  }
  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send("welcome to the protected route");
  }
}
