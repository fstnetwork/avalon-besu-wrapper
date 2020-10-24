pragma solidity ^0.5.0;

contract Sample {
    event calledback (
        bytes32 indexed workOrderId,
        bytes32 indexed workerId,
        bytes32 indexed requesterId,
        string workOrderResponse
    );

    event workOrderSubmitted (
        bytes32 indexed workOrderId,
        bytes32 indexed workerId,
        bytes32 indexed requesterId,
        string          workOrderRequest,
        uint256         errorCode,
        address         senderAddress,
        bytes4          version
    );

    event workOrderCompleted (
        bytes32 requesterId,
        bytes32 workOrderId,
        uint256 workOrderStatus,
        string workOrderResponse,
        uint256 errorCode,
        bytes4 version
    );

    event workOrderReceiptCreated (
        bytes32 indexed workOrderId,
        bytes32 indexed workerServiceId,
        bytes32 indexed requesterId,   // CHANGE (order): cannot have indexed after non indexed
        bytes32         workerId,      // CHANGE (order): cannot have indexed after non indexed
        uint256         receiptStatus, // CHANGE (consistency): status/update types are uint256, not bytes32
        bytes           workOrderRequestHash,
        uint256         errorCode
    );

    event workOrderReceiptUpdated (
        bytes32 indexed workOrderId,
        bytes32 indexed updaterId,
        uint256 indexed updateType, // CHANGE (consistency): status/update types are uint256, not bytes32
        bytes           updateData,
        bytes           updateSignature,
        string          signatureRules,
        uint256         errorCode
    );

    function __callback__ (
        bytes32 workOrderId,
        bytes32 workerId,
        bytes32 requesterId,
        string memory workOrderResponse
    ) public {
        emit calledback(workOrderId, workerId, requesterId, workOrderResponse);
    }
}

contract S_WOR {
    event workOrderSubmitted (
        bytes32 indexed workOrderId,
        bytes32 indexed workerId,
        bytes32 indexed requesterId,
        string          workOrderRequest,
        uint256         errorCode,
        address         senderAddress,
        bytes4          version
    );

    event workOrderCompleted (
        bytes32 requesterId,
        bytes32 workOrderId,
        uint256 workOrderStatus,
        string workOrderResponse,
        uint256 errorCode,
        bytes4 version
    );

    function workOrderSubmit (
        bytes32 workOrderId,
        bytes32 workerId,
        bytes32 requesterId,
        string memory workOrderRequest,
        uint256 errorCode,
        address senderAddress,
        bytes4 version
    ) public {
        emit workOrderSubmitted(workOrderId, workerId, requesterId, workOrderRequest, errorCode, senderAddress, version);
    }

    function workOrderComplete (
        bytes32 requesterId,
        bytes32 workOrderId,
        uint256 workOrderStatus,
        string memory workOrderResponse,
        uint256 errorCode,
        bytes4 version
    ) public {
        emit workOrderCompleted(requesterId, workOrderId, workOrderStatus, workOrderResponse, errorCode, version);
    }
}

contract S_WORR {
    event workOrderReceiptCreated (
        bytes32 indexed workOrderId,
        bytes32 indexed workerServiceId,
        bytes32 indexed requesterId,   // CHANGE (order): cannot have indexed after non indexed
        bytes32         workerId,      // CHANGE (order): cannot have indexed after non indexed
        uint256         receiptStatus, // CHANGE (consistency): status/update types are uint256, not bytes32
        bytes           workOrderRequestHash,
        uint256         errorCode
    );

    event workOrderReceiptUpdated (
        bytes32 indexed workOrderId,
        bytes32 indexed updaterId,
        uint256 indexed updateType, // CHANGE (consistency): status/update types are uint256, not bytes32
        bytes           updateData,
        bytes           updateSignature,
        string          signatureRules,
        uint256         errorCode
    );

    function workOrderReceiptCreate (
        bytes32 workOrderId,
        bytes32 workerServiceId,
        bytes32 requesterId,   // CHANGE (order): cannot have indexed after non indexed
        bytes32 workerId,      // CHANGE (order): cannot have indexed after non indexed
        uint256 receiptStatus, // CHANGE (consistency): status/update types are uint256, not bytes32
        bytes memory workOrderRequestHash,
        uint256 errorCode
    ) public {
        emit workOrderReceiptCreated(workOrderId, workerServiceId, requesterId, workerId, receiptStatus, workOrderRequestHash, errorCode);
    }

    function workOrderReceiptUpdate (
        bytes32 workOrderId,
        bytes32 updaterId,
        uint256 updateType, // CHANGE (consistency): status/update types are uint256, not bytes32
        bytes memory updateData,
        bytes memory updateSignature,
        string memory signatureRules,
        uint256 errorCode
    ) public {
        emit workOrderReceiptUpdated(workOrderId, updaterId, updateType, updateData, updateSignature, signatureRules, errorCode);
    }
}
