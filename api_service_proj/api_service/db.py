    
import click
from sqlalchemy import create_engine
from flask import g
import os

def get_db():
    if 'engine' not in g:
        g.engine = create_engine("postgresql://postgres:example123@db:5432/helix")
    return g.engine 

@click.command('init-db')
def init_db_command():
    get_db()
    click.echo('Initialized the database.')

def init_db(app):
    app.cli.add_command(init_db_command)