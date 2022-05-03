# Generated by Django 3.2.12 on 2022-04-29 03:25

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):
    atomic = False

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('documents', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Document',
            new_name='DocumentModel',
        ),
        migrations.RenameModel(
            old_name='Folder',
            new_name='FolderModel',
        ),
    ]
