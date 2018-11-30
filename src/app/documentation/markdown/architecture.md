
## Folder Structure

```
index.html
app/
│    app.component.scss
│    app.component.spec.ts
│    app.component.ts
│    app.module.ts
└──  todos/
   │     todos.module.ts
   │     todos.service.spec.ts
   │     todos.service.ts
   ├── components/
   │         todo-list/
   │             todo-list.component.scss
   │             todo-list.component.spec.ts
   │             todo-list.component.ts
   │         todo-form/
   │             todo-form.component.scss
   │             todo-form.component.spec.ts
   │             todo-form.component.ts
   │         todo-item/
   │             todo-item.component.scss
   │             todo-item.component.spec.ts
   │             todo-item.component.ts
   ├── containers/
   |         todo/
   |             todo.component.scss
   |             todo.component.spec.ts
   |             todo.component.ts
   │         todos/
   │             todos.component.scss
   │             todos.component.spec.ts
   │             todos.component.ts
   └── interfaces/
              todo.interface.ts
```

* Root + feature module architecture
* Directory structure
* TypeScript models/interfaces

* CSS options (Sass/etc)
* Component architecture
* Container + Presentational components
* State management (ngrx/store etc)
* Route configuration
* Structure practices (maybe lifecycle hooks/DI practices)
* Tooling (AoT/Webpack/etc)
* Build process info (platforms)
* Resources section