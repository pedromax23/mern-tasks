import { Tarea } from "../db.js";

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
    const tasks = await Tarea.findAll({
        where: {
            usuario_id: req.userId
        }
    })

    res.json({
        count: tasks.length,
        data: tasks
    })
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
        const { title, descripccion } = req.body;

        const creandoTarea = await Tarea.create({
            title,
            descripccion,
            usuario_id: req.userId
        },)

        res.json(creandoTarea)
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: "La tarea ya existe" })
        }
        next(error)
    }

};

// Actualizar tarea
export const updateTask = async (req, res) => {
    const {id} = req.params;
    const {title, descripccion} = req.body;

    const tarea = await Tarea.findByPk(id)
    if(!tarea) return res.status(404).json({message: 'No existe una tarea con ese ID'})

    const updateTask = await tarea.update({
        title,
        descripccion
    })

    return res.json({
        id,
        title: updateTask.title,
        descripccion: updateTask.descripccion
    })
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