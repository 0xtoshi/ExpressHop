CREATE TABLE `transferSentETH` (
  `id` varchar(255) NOT NULL UNIQUE,
  `address_from` varchar(255) NOT NULL,
  `transferId` varchar(255) NOT NULL,
  `destinationChainId` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `amountOutMin` varchar(255) NOT NULL,
  `bonderFee` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `deadline` varchar(255) NOT NULL,
  `transactionHash` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `transferSentOP` (
  `id` varchar(255) NOT NULL UNIQUE,
  `address_from` varchar(255) NOT NULL,
  `transferId` varchar(255) NOT NULL,
  `destinationChainId` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `amountOutMin` varchar(255) NOT NULL,
  `bonderFee` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `deadline` varchar(255) NOT NULL,
  `transactionHash` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `transferSentPOLY` (
  `id` varchar(255) NOT NULL UNIQUE,
  `address_from` varchar(255) NOT NULL,
  `transferId` varchar(255) NOT NULL,
  `destinationChainId` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `amountOutMin` varchar(255) NOT NULL,
  `bonderFee` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `deadline` varchar(255) NOT NULL,
  `transactionHash` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `transferSentARB` (
  `id` varchar(255) NOT NULL UNIQUE,
  `address_from` varchar(255) NOT NULL,
  `transferId` varchar(255) NOT NULL,
  `destinationChainId` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `amountOutMin` varchar(255) NOT NULL,
  `bonderFee` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `deadline` varchar(255) NOT NULL,
  `transactionHash` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `transferSentXDAI` (
  `id` varchar(255) NOT NULL UNIQUE,
  `address_from` varchar(255) NOT NULL,
  `transferId` varchar(255) NOT NULL,
  `destinationChainId` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `amountOutMin` varchar(255) NOT NULL,
  `bonderFee` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `deadline` varchar(255) NOT NULL,
  `transactionHash` varchar(255) NOT NULL,
  `timestamp` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

