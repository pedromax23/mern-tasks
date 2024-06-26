import { Tarea } from "../db.js";

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
    const tasks = await Tarea.findAll({
        where: {
            usuario_id: req.userId
        }
    })

    res.json(tasks)
};

// Obtener una sola tarea
export const getTask = async (req, res) => {
    const task = await Tarea.findByPk(req.params.id)

    if (!task) return res.status(404).json({ message: 'No existe una tarea con ese ID' })

    res.json(task)
};

// Crear tarea
export const createTask = async (req, res, next) => {
    try {
        const { title, descripcion } = req.body;

        const findTask = await Tarea.findOne({
            where: {
                title,
                usuario_id: req.userId,
            }
        })
        console.log(findTask)
        if(findTask) return res.status(409).json({ message: "La tarea ya existe" })

        const creandoTarea = await Tarea.create({
            title,
            descripcion,
            usuario_id: req.userId
        },)

        res.json(creandoTarea)
    } catch (error) {

        next(error)
    }

};

// Actualizar tarea
export const updateTask = async (req, res) => {
    const {id} = req.params;
    const {title, descripcion} = req.body;

    const tarea = await Tarea.findByPk(id)
    if(!tarea) return res.status(404).json({message: 'No existe una tarea con ese ID'})

    const updateTask = await tarea.update({
        title,
        descripcion
    })

    return res.json(updateTask)
};

// Eliminar tarea
export const deleteTask = async (req, res) => {

    const { id } = req.params;

    const eliminar = await Tarea.destroy({
        where: {
            id: id
        }
    })
    if (eliminar === 0) return res.status(404).json({ message: 'No existe una tarea con ese id' })


    return res.sendStatus(204)
};