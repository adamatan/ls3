# ls3 - ls for S3


Bucket and file lister for AWS S3.

## Installation

    git clone https://github.com/adamatan/ls3/
    cd src
    yarn link

## Usage

    ls3                 # list buckets, e.g. :

    Nov 19  2014    bucket   my-website-adam
    Aug 20  2016    bucket   adamatan-backups
    Oct 21  2017    bucket   static.example.com

    ls3 <bucket-name>   # list objects and directories in a bucket, e.g. :

    adamatan1 5453666548 Jul  4 19:44   DEEP_ARCHIVE         scans.tar.bz2
    adamatan1       3572 Feb 22  2016   STANDARD             archives.html
    adamatan1          0 Feb 22  2016   directory            author/
    adamatan1       3500 Feb 22  2016   STANDARD             authors.html
    adamatan1       3433 Feb 22  2016   STANDARD             categories.html
    adamatan1          0 Feb 22  2016   directory            category/

## Status

Pre alpha, under development. Feel free to try and comment.
