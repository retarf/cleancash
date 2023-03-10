# Generated by Django 4.1.5 on 2023-02-09 17:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('fields', '0002_alter_field_name'),
        ('children', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CleaningUp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('child', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='children.children')),
                ('field', models.ManyToManyField(to='fields.field')),
            ],
        ),
    ]
