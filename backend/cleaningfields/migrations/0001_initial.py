# Generated by Django 4.1.5 on 2023-02-05 17:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('fields', '0001_initial'),
        ('children', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CleaningField',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('child', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='children.children')),
                ('field', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fields.field')),
            ],
        ),
    ]
