#!/usr/bin/env node

const AWS = require('aws-sdk');
const { fileSize, intComma } = require('humanize-plus');
const chalk = require('chalk');
const meow = require('meow');
const ora = require('ora');
const { formatDate } = require('./utils');

const s3 = new AWS.S3();

/**
 * Remove files in directories for non-recursive search
 */
function removeInnerFiles(data) {
  directories = new Set();
  keysWithDirectories = [];
  data.forEach((element) => {
    if (!element.Key.includes('/')) {
      keysWithDirectories.push(element);
    } else {
      let dirName = element.Key.split('/')[0] + '/';
      if (!directories.has(dirName)) {
        keysWithDirectories.push(
          Object.assign({}, element, {
            Key: chalk.blueBright(dirName),
            StorageClass: 'directory',
            Size: 0
          })
        );
        directories.add(dirName);
      }
    }
  });
  return keysWithDirectories;
}

/**
 * Prints a single S3 object key or directory to the console.
 */
function printLine(element) {
  console.log(
    element.Owner.DisplayName,
    element.Size.toString().padStart(10, ' '),
    formatDate(element.LastModified),
    ' ',
    element.StorageClass.padEnd(20, ' '),
    element.Key
  );
}

const cli = meow(
  `
    Usage
      $ sls <bucket>
 
    Options
      --recursive, -r  Recurse into directories
 
    Examples
      $ sls my.example.bucket --recursive
`,
  {
    flags: {
      recursive: {
        type: 'boolean',
        alias: 'r'
      }
    }
  }
);

const bucketName = cli.input[0];
const bucketNameSpecified = Boolean(bucketName);
const spinner = ora(
  `Listing ${bucketNameSpecified ? bucketName : 'all buckets'}`
).start();

if (bucketNameSpecified) {
  s3.listObjectsV2({ Bucket: bucketName, FetchOwner: true }, (err, data) => {
    spinner.stop();
    if (err) {
      console.log(err, err.stack);
    } else {
      keys = removeInnerFiles(data.Contents);
      keys.forEach((element) => printLine(element));
    }
  });
} else {
  s3.listBuckets({}, (err, data) => {
    spinner.stop();
    if (err) {
      console.log(err, err.stack);
    } else {
      data.Buckets.forEach((element) =>
        console.log(
          formatDate(element.CreationDate),
          '\tbucket\t',
          element.Name
        )
      );
    }
  });
}
