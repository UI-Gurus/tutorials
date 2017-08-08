# Introduction to Git for beginners

## Table of Contents

* [What is Git](#what-is-git)
* [Basic Snapshotting](#basic-snapshotting)
  * [Add](#add)
  * [Commit](#commit)
* [Branching and Merging](#branching-and-merging)
  * [Updating the Local Repository](#updating-the-local-repository)
  * [Creating New Local Branches](#creating-new-local-branches)
  * [Pushing to Remote](#pushing-to-remote)
* [Stash](#stash)
* [Interactive Rebase](#interactive-rebase)
  * [Pick](#pick)
  * [Reword](#reword)
  * [Squash](#squash)
  * [Fixup](#fixup)
* [Resolving Merging Conflicts](#resolving-merging-conflicts)
  * [Merge](#merge)
  * [Rebase](#rebase)
  * [Rebasing Local Branch with Master](#rebasing-local-branch-with-master)
  * [Undoing a Rebase](#undoing-a-rebase)
* [References](#references)

## What is Git

Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency

## Basic Snapshotting

### Add

Add file contents to the index

`$ git add`

#### Outstanding Options

`$ git add -p`

This lets to choose one path out of a status like selection. After choosing the path, it presents the diff between the index and the working tree file and asks if you want to stage the change of each hunk. If `y` is selected the hunk is staged. If `n` is selected the hunk is not staged.

### Commit

Record changes to the repository

`$ git commit`

By not providing any parameter to the instruction `$ git commit` it will open de configured editor to properly give a message, description and any other information properly. A good way of give the commit information is this:

```
Main message of the Commit
                                <- The second line must be empty
A more detailed description of the changes introduced by the commit
                                <- This line could be empty
Any other information like tickets associated
```

It's important to configure the default editor so that the Git Bash wait for it and don't close automatically. [Here](https://help.github.com/articles/associating-text-editors-with-git/) you have the necessary to configure some popular editors.

#### Outstanding Options

`$ git commit --amend`

With this command it's possible to rewrite the last commit message. It will open your default editor with the last commit message

## Branching and Merging

### Updating the Local Repository

When new local branches are going to be created, it's important create them from the latest commit on master:

`$ git pull origin master`

`git pull` does a `git fetch` followed by a `git merge` to update the local repo with the remote repo.

When `pull` is used, Git tries to automatically do your work for you. It's context sensitive, so Git will merge any pulled commits into the current branch. `pull` automatically merges the commits without letting review them first.

When `fetch` is used, Git gathers any commits from the target branch that don't exist in the current branch and stores them in the local repository. However, it doesn't merge them with the current branch. This is particularly useful if it's needed to keep the repository up tp date but could break the local work is the files are updated. To integrate the commits into the branch it's used `merge`

### Creating New local branches

To create a branch it can be used `$ git checkout -b <new-branch-name> [<base-branch-name>]`, where `base-branch-name` is optional and defaults to `master`

To rename a local branch: `$ git branch -m <oldname> <newname>`. If it's the current branch: `$ git branch -m <newname>`

### Pushing to Remote

`$ git push origin new-branch-name` or `$ git push origin HEAD`

## Stash

`$ git stash`

It's used when the current state of the working directory and the index want to be recorded but want to go back to a clean working directory. The command saves the local modifications away and reverts the working directory to match the `HEAD` commit.

The modifications stashed away by this command can be listed with `$ git stash list` and restored (potentially on top of a different commit) with `$ git stash apply`.

After doing `$ git stash apply`, the changes are still in the stash, so it's necessary to do:

`$ git stash pop`

In a sense it's like doing a temporary commit that then it can be rolled back. But it's not necessary to write a commit message or do anything complicated. It can be used to easily change between local branches without doing a commit if the work on one of the branches it's not finished yet.

## Interactive Rebase

This command will open an editor with a list of the commits which are about to be changed

`$ git rebase -i`

To get an specific number of commits the command would be:

`$ git rebase -i HEAD~4`

By running the previous command an editor with the last 4 commits will open and some options are available to apply:

```
pick 07c5abd Introduce OpenPGP and teach basic usage
pick de9b1eb Fix PostChecker::Post#urls

# Rebase 8db7e8b..fa20af3 onto 8db7e8b
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

#### Pick

It's the default action. It would reapply the commit as is, no changes in its contents or messages

#### Reword

If one of the commits is changed from `pick` to `reword` and the file it's saved and quit the editor, git will follow the described commands, landing into the editor again.

#### Squash

It melds the commit into the previous one (the one in the line before)

#### Fixup

It acts like `squash` but discards the commit's message

## Resolving Merging Conflicts

* Suppose originally there were 3 commits: A, B and C
* Then two different developers create new commits. One of them, commit D on master and the other one on the local branch: commit E

This conflict should be resolved somehow. There are 2 ways:

#### Merge

Both commits `D` and `E` are still here but the merge commit `M` was created. This commit inherits changes from both `D` and `E`. However, this created diamond shape, which can be confused for some people.

#### Rebase

The commit `R` is created, which actual file content is identical to that of merge commit `M` above. But commit `E` is undone, like it never existed. `E` should be local to the developer who created it and should have never been pushed to any other repository. Advantages of rebase is that diamond shape is avoided and history stays nice straight line.

#### Rebasing Local Branch with Master

```
git fetch origin          # Updates origin/master
git rebase origin/master  # Rebases current branch onto origin/master
```

#### Undoing a Rebase

First, it's necessary to find the head commit of the branch as it was immediately before the rebase started in the reflog

`$ git reflog`

Then, reset the current branch to it

`$ git reset --hard HEAD@{5}`. Supposing that the commit number 5 is the head


## References

* [Official Git Documentation](https://git-scm.com/docs)
* [Pull vs Fetch](https://stackoverflow.com/questions/292357/what-is-the-difference-between-git-pull-and-git-fetch)
* [Branching](https://yangsu.github.io/pull-request-tutorial/)
* [Stash](stash: https://coderwall.com/p/xlhlvw/git-stash--2)
* [Rebase Interactive](https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history)
* [Rebase](https://stackoverflow.com/questions/16666089/whats-the-difference-between-git-merge-and-git-rebase)
* [Undoing Rebase](https://stackoverflow.com/questions/134882/undoing-a-git-rebase)
