import Command from "../../Command.js";

const documentation = `Digital Harbor is a leader in document security and form data management. The Builder application is a wysiwyg platform for building enterprise web applications. The Builder application consists of subforms with sections, layouts, elements, and components. Users can modify their pages with command objects specifying action, values, and target node IDs. The interface includes a left sidebar for elements, a center workspace for sections, and a right sidebar for properties and theming. Users can drag elements, sort, align, and theme them. In addition to standard html elements builder has complex components such as Graphical Choice, Multi-select Choice with related terms and Image Collage. We have a robust listeners system for handling events. Once a form is published the form can be filled out and submitted at set forms.`;

export default class GetDocumentationCommand extends Command {
    async execute() {
        return [{
            role: 'assistant',
            content: documentation
        }];
    }
}