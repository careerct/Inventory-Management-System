function makeController(Model, label) {
    return {
        list: async (req, res) => {
            try { res.json(await Model.find().sort({ createdAt: -1 })); }
            catch (e) { res.status(500).json({ message: e.message }); }
        },
        create: async (req, res) => {
            try { res.status(201).json(await Model.create(req.body)); }
            catch (e) { res.status(400).json({ message: e.message }); }
        },
        update: async (req, res) => {
            try {
                const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
                if (!item) return res.status(404).json({ message: `${label} not found` });
                res.json(item);
            } catch (e) { res.status(400).json({ message: e.message }); }
        },
        remove: async (req, res) => {
            try {
                const item = await Model.findByIdAndDelete(req.params.id);
                if (!item) return res.status(404).json({ message: `${label} not found` });
                res.json({ message: `${label} deleted` });
            } catch (e) { res.status(400).json({ message: e.message }); }
        }
    };
}
module.exports = makeController;
