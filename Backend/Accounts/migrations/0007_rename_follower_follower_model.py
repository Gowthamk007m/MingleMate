# Generated by Django 4.2.3 on 2023-08-10 09:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Accounts', '0006_imagepost_comment_count'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Follower',
            new_name='Follower_Model',
        ),
    ]
