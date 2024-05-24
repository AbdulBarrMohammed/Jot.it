
import { createTaskCard } from "./createProjectContent";

class Task {
    constructor(title, details, date) {
        this.title = title;
        this.details = details;
        this.date = date;
        this.isCrossedOut = false;
        this.id = '';
        this.isImportant = false;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setIsCrossedOut(bool) {
        this.isCrossedOut = bool;
    }

    getIsCrossedOut() {
        return this.isCrossedOut;
    }

    setIsImportant(bool) {
        this.isImportant = bool;
    }

    getIsImportant() {
        return this.isImportant;
    }
    getTitle() {
        return this.title;
    }

    getDate() {
        return this.date;
    }
    getDetails() {
        return this.details;
    }

    setTitle(title) {
        this.title = title;
    }

    setDate(date) {
        this.date = date;
    }

    setDetails(details) {
        this.details = details;
    }
    //give each task div a unique id
    createTaskDiv() {
        return createTaskCard(this.title, this.details, this.date, this.isCrossedOut, this.id);
    }
}

export { Task };
