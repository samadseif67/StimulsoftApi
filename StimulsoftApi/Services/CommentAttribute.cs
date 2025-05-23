﻿using System;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public class CommentAttribute : Attribute
{
    public string Comment { get; }
    public CommentAttribute(string comment)
    {
        Comment = comment;
    }
}
