import { uploadUserDocumentService, uploadOrderProofService } from '../services/upload.service.js';

export const uploadUserDocumentController = async (req, res) => {
    const result = await uploadUserDocumentService({
        userId: req.params.uid,
        documentType: req.body.documentType,
        file: req.file
    });

    res.status(201).json({
        status: 'success',
        message: 'Documento cargado exitosamente',
        payload: result
    });
};

export const uploadOrderProofController = async (req, res) => {
    const result = await uploadOrderProofService({
        orderId: req.params.oid,
        file: req.file
    });

    res.status(201).json({
        status: 'success',
        message: 'Comprobante cargado exitosamente',
        payload: result
    });
};
