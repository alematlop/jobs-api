const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const {where} = require("sequelize");


const getAllJobs = async (req, res) => {

    const jobs = await Job.findAll({
        where: {
            createdBy: req.user.userId
        },
        order: [['createdAt', 'DESC']],
    });

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}} = req;

    const job = await Job.findOne({
        where:{
            id: jobId,
            createdBy: userId
        }
    })

    if (job === null) {
        throw new NotFoundError(`No job with id ${jobId} available`);
    }

    res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req, res) => {

    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {

    const {
        user:{userId},
        params:{id:jobId},
        body: {company, position, status}
    } = req;

    if (company === '' || position === '' || status === '') {
        throw new BadRequestError('Company or Position fields cannot be empty');
    }

    const job = await Job.update(
        {
            company: company,
            position: position,
            status: status
        },
        {
            where:{
                id: jobId,
                createdBy: userId
            }
        }
    )

    if (job < 1){
        throw new NotFoundError(`No job with id ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req, res) => {

    const {user:{userId}, params:{id:jobId}} = req;

    const job = await Job.destroy({
        where:{
            id: jobId,
            createdBy: userId
        }
    })

    if (job < 1){
        throw new NotFoundError(`No job with id ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}